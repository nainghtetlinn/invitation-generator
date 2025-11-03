import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Footer } from "./components/footer";
import { FormFields } from "./components/form-fields";
import { GroupsTable } from "./components/groups-table";
import { Toast } from "./components/toast";
import { invitationSchema, type Invitation } from "./lib/schema";
import { generate } from "./lib/utils";
import { Header } from "./components/header";

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
      groups: [],
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
      <Header />
      <main className="mx-auto container px-2 pt-4 h-svh">
        <section className="space-y-4">
          <FormFields form={form} />

          <GroupsTable form={form} />

          <div className="flex justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
              className="btn btn-primary"
            >
              Generate {loading && <Loader2 className="animate-spin" />}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
