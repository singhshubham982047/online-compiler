import { Button } from "./ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Loader, Save } from "lucide-react";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const EditorHeader = () => {
  const navigate = useNavigate();
  const { urlId } = useParams();
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const defaultLang = useSelector(
    (state: RootState) => state.compiler.currentLang
  );

  const code = useSelector((state: RootState) => state.compiler.code);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/v1/save", {
        code,
      });
      setIsLoading(false);
      navigate(`/compiler/${response.data?.fullCode?._id}`);
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  return (
    <div className="h-[50px] bg-black text-white flex justify-between items-center">
      <div className="flex gap-2 ml-3">
        <Button
          variant={"success"}
          className="flex items-center gap-1"
          disabled={isLoading}
          onClick={handleSave}>
          {isLoading ? (
            <>
              <Loader className="animate-spin" size={24} />
            </>
          ) : (
            <>
              <Save size={20} />
            </>
          )}
        </Button>

        {shareBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ExternalLinkIcon fontSize={"24px"} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" readOnly value={window.location.href} />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={() => {
                    window.navigator.clipboard.writeText(window.location.href);
                    toast.success("Copied to clipboard");
                  }}>
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="mr-2">
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
