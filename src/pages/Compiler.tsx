import CodeEditor from "@/components/CodeEditor";
import EditorHeader from "@/components/EditorHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Compiler = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel
        defaultSize={50}
        className="h-[calc(100dvh-60px)] min-w-[300px]">
        <EditorHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={50}
        className="h-[calc(100dvh-60px)] min-w-[300px]">
        Right
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;