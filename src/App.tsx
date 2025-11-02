import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormFields } from "./components/form-fields";
import { GroupDialog } from "./components/group-dialog";
import { GroupsTable } from "./components/groups-table";
import { Toast } from "./components/toast";
import { invitationSchema, type Invitation } from "./lib/schema";
import { generate } from "./lib/utils";

function App() {
  const groupRef = useRef<HTMLDialogElement>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
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

  const {
    fields,
    append: appendGroup,
    update: updateGroup,
    remove: removeGroup,
  } = useFieldArray({
    control: form.control,
    name: "groups",
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

  const handleAdd = () => {
    setEditIndex(null);
    groupRef.current?.showModal();
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    groupRef.current?.showModal();
  };

  const handleRemove = (index: number) => {
    removeGroup(index);
  };

  return (
    <>
      <GroupDialog
        ref={groupRef}
        defaultValues={editIndex !== null ? fields[editIndex] : undefined}
        onSubmit={(data) => {
          if (editIndex !== null) {
            updateGroup(editIndex, data);
            setEditIndex(null);
          } else {
            appendGroup(data);
          }
          groupRef.current?.close();
        }}
      />
      <main className="mx-auto container px-2">
        <h1 className="text-center text-2xl font-bold text-base-content py-4">
          Generate Invitation
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormFields form={form} />

          <GroupsTable
            fields={fields}
            form={form}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />

          <div className="flex justify-end">
            <button
              disabled={loading}
              className="btn btn-secondary"
            >
              Generate {loading && <Loader2 className="animate-spin" />}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
