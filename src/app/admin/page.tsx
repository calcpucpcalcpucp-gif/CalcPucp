import { generateAdminAction } from "@/actions/adminActions";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Admin() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-80">
        <form action={generateAdminAction}>
          <Field>
            <Label className="text-xl">Password</Label>
            <Input type="password" name="password" />
          </Field>
        </form>
      </div>
    </div>
  );
}
