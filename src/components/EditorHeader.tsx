import { Button } from "./ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialStateType,
  updateCurrentLang,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";

const EditorHeader = () => {
  const dispatch = useDispatch();
  const defaultLang = useSelector(
    (state: RootState) => state.compiler.currentLang
  );
  return (
    <div className="h-[50px] bg-black text-white flex justify-between items-center">
      <div className="flex gap-2 ml-3">
        <Button variant={"success"} className="flex items-center gap-1">
          Save <Save size={16} />
        </Button>
        <Button variant={"outline"} className="flex items-center gap-1">
          Share <ExternalLinkIcon />
        </Button>
      </div>
      <div className="mr-3">
        <Select
          defaultValue={defaultLang}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLang(value as InitialStateType["currentLang"])
            )
          }>
          <SelectTrigger className="w-[180px] focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JAVASCRIPT</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EditorHeader;
