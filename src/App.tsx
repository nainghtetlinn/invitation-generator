import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Footer } from "./components/footer";
import { FormFields } from "./components/form-fields";
import { GroupsTable } from "./components/groups-table";
import { Header } from "./components/header";
import { Toast } from "./components/toast";
import { WarningDialog } from "./components/warning-dialog";
import { invitationSchema, type Invitation } from "./lib/schema";
import { generate } from "./lib/utils";

function App() {
  const confirmRef = useRef<HTMLDialogElement | null>(null);
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

  const handleGenerate = () => {
    confirmRef.current?.showModal();
  };

  return (
    <>
      <WarningDialog
        onClick={form.handleSubmit(onSubmit)}
        ref={confirmRef}
      />
      <Header />
      <main className="mx-auto container px-2 py-4 min-h-svh">
        <section className="space-y-2">
          <FormFields form={form} />

          <GroupsTable form={form} />
        </section>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="btn btn-primary"
          >
            Generate {loading && <Loader2 className="animate-spin" />}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
