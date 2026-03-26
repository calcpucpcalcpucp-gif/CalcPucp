import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { QrCode, Search } from "lucide-react";

export const SearchCourse = ({
  value,
  onClickQr,
  onSearch,
  onChange,
}: {
  value: string;
  onChange?: (text: string) => void;
  onClickQr?: () => void;
  onSearch?: (text: string) => void;
}) => {
  const handleSumit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch?.(formData.get("query")! as string);
  };

  return (
    <Field orientation="horizontal" className="px-3">
      <form className="flex w-full  gap-2 " onSubmit={handleSumit}>
        <Input
          type="search"
          placeholder="Buscar cursos..."
          name="query"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          enterKeyHint="search"
        />
        <Button variant="outline" className="w-9.75 h-9.75">
          <Search />
        </Button>
      </form>
      <Button
        className="w-9.75 h-9.75 flex items-center justify-center  bg-primary p-0"
        onClick={onClickQr}
      >
        <QrCode className="min-w-5.75 min-h-5.75 text-white" />
      </Button>
    </Field>
  );
};
