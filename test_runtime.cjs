async function testPage() {
  const { spawn } = require('child_process');
  
  const preview = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '5180']);
  await new Promise(r => setTimeout(r, 2500));

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    'http://localhost:5180'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  try {
    const list = await fetch('http://localhost:9224/json').then(r => r.json());
    console.log('Targets found:', list.length);
    const target = list.find(t => t.type === 'page');
    if (!target) {
      console.log('No page target found');
      return;
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
    });

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION THROWN:', JSON.stringify(data.params.exceptionDetails));
      }
      if (data.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE API:', data.params.type, data.params.args.map(a => a.value || a.description).join(' '));
      }
    });

    await new Promise(r => setTimeout(r, 4000));
    ws.close();
  } catch (err) {
    console.error('Error testing page:', err);
  } finally {
    chrome.kill();
    preview.kill();
  }
}

testPage();
