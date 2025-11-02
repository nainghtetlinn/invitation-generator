import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormFields } from "./components/form-fields";
import { GroupsTable } from "./components/groups-table";
import { Toast } from "./components/toast";
import { invitationSchema, type Invitation } from "./lib/schema";
import { generate } from "./lib/utils";

function App() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      department: "select a department",
      year: "select a year",
      academic: "",
      date: "",
      time: "",
      place: "",
      groups: [
        {
          title: "Hello",
          members: [{ name: "hello", rollNo: "hello", repeater: false }],
        },
        {
          title: "Wrold",
          members: [{ name: "world", rollNo: "world", repeater: false }],
        },
      ],
    },
  });

  const onSubmit = async (data: Invitation) => {
    try {
      setLoading(true);
      await generate(data);
    } catch (error) {
      console.log(error);
      toast.custom(() => <Toast title="Something went wrong." />);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="mx-auto container px-2">
        <h1 className="text-center text-2xl font-bold text-base-content py-4">
          Generate Invitation
        </h1>
        <section className="space-y-4">
          <FormFields form={form} />

          <GroupsTable form={form} />

          <div className="flex justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
              className="btn btn-secondary"
            >
              Generate {loading && <Loader2 className="animate-spin" />}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
