import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head></head>
    <body>
    <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data)
          } catch(err) {
            const root = document.getElementById("root")
            console.error(err)
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
          };
        }, false);
      </script>
    </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <iframe
      style={{ backgroundColor: 'white' }}
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;
