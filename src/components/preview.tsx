import './preview.css';

import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head></head>
    <body>
    <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.getElementById("root")
          console.error(err)
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
        }
        window.addEventListener('error', (e) => {
          event.preventDefault()
          handleError(e.error)

        })
        window.addEventListener('message', (event) => {
          try {
            eval(event.data)
          } catch(err) {
            handleError(err)
          };
        }, false);
      </script>
    </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    // <Resizable direction="horizontal">
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
    // </Resizable>
  );
};

export default Preview;
