import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const RenderCode = () => {
  const code = useSelector((state: RootState) => state.compiler.code);
  const combinedCode = `
    <html lang="en">
    <style>${code.css}</style>
    <body>
    ${code.html}
    <script>${code.javascript}</script>
    </body>
    </html>
    `;
  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="h-[calc(100dvh-60px)]">
      <iframe src={iframeCode} className="w-full h-full" />
    </div>
  );
};

export default RenderCode;
