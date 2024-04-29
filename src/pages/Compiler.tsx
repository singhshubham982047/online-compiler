import CodeEditor from "@/components/CodeEditor";
import EditorHeader from "@/components/EditorHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateCode } from "@/redux/slices/compilerSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Compiler = () => {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const loadCode = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/load-code/${urlId}`
      );
      dispatch(updateCode(response.data.code?.code));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast.error("Invalid Url, Default code loaded");
        }
        if (error.response?.status === 404) {
          toast.error("Invalid Url, Default code loaded");
        }
      }
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

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
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
