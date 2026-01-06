import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormFields } from "./components/form-fields";
import { GroupsTable } from "./components/groups-table";
import { Toast } from "./components/toast";
import { WarningDialog } from "./components/warning-dialog";
import { invitationSchema, type Invitation } from "./lib/schema";
import { generate } from "./lib/utils";
import { Link } from "react-router-dom";

const STORAGE_KEY = "invitation-form";

function App() {
  const confirmRef = useRef<HTMLDialogElement | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      type: "select a type",
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

  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (e: unknown) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, []);

  return (
    <>
      <WarningDialog
        onClick={form.handleSubmit(onSubmit)}
        ref={confirmRef}
      />
      <main className="mx-auto container max-w-5xl px-2 py-4 min-h-svh">
        <section className="space-y-2">
          <FormFields form={form} />

          <GroupsTable form={form} />
        </section>
        <div className="flex justify-between mt-4">
          <p>
            Do you want to edit yourself?{" "}
            <Link
              to="/download"
              className="link"
            >
              download templates
            </Link>
          </p>
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
    </>
  );
}

export default App;
