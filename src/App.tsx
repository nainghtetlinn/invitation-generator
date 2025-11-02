import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, GripVertical, Info, Loader2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { GroupDialog } from "./components/group-dialog";
import { SortableRow } from "./components/sortable-row";
import { Toast } from "./components/toast";
import { DEPARTMENTS, YEARS } from "./lib/constants";
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
      <main className="mx-auto container">
        <h1 className="text-center text-2xl font-bold text-base-content py-4">
          Generate Invitation
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              className={`select w-full ${
                form.formState.errors.department && "select-error"
              }`}
            >
              <span className="label">Department</span>
              <select {...form.register("department")}>
                <option
                  disabled
                  value="select a department"
                >
                  Select a department
                </option>
                {DEPARTMENTS.map((d) => (
                  <option
                    key={d.short}
                    value={d.short}
                  >
                    {d.long}
                  </option>
                ))}
              </select>
            </label>
            {form.formState.errors.department && (
              <p className="text-error">
                {form.formState.errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`select w-full ${
                form.formState.errors.year && "select-error"
              }`}
            >
              <span className="label">Year</span>
              <select {...form.register("year")}>
                <option
                  disabled
                  value="select a year"
                >
                  Select a year
                </option>
                {YEARS.map((y) => (
                  <option
                    key={y.number}
                    value={y.text}
                  >
                    {y.text} year
                  </option>
                ))}
              </select>
            </label>
            {form.formState.errors.year && (
              <p className="text-error">{form.formState.errors.year.message}</p>
            )}
          </div>

          <div>
            <label
              className={`input w-full ${
                form.formState.errors.academic && "input-error"
              }`}
            >
              <span className="label">Academic</span>
              <input
                type="text"
                placeholder="2019-2020"
                {...form.register("academic")}
              />
            </label>
            {form.formState.errors.academic && (
              <p className="text-error">
                {form.formState.errors.academic.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`input w-full ${
                form.formState.errors.date && "input-error"
              }`}
            >
              <span className="label">Date</span>
              <input
                type="date"
                {...form.register("date")}
              />
            </label>
            {form.formState.errors.date && (
              <p className="text-error">{form.formState.errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              className={`input w-full ${
                form.formState.errors.time && "input-error"
              }`}
            >
              <span className="label">Time</span>
              <input
                type="time"
                {...form.register("time")}
              />
            </label>
            {form.formState.errors.time && (
              <p className="text-error">{form.formState.errors.time.message}</p>
            )}
          </div>

          <div>
            <label
              className={`input w-full ${
                form.formState.errors.place && "input-error"
              }`}
            >
              <span className="label">Place</span>
              <input
                type="text"
                placeholder="Seminar room"
                {...form.register("place")}
              />
            </label>
            {form.formState.errors.place && (
              <p className="text-error">
                {form.formState.errors.place.message}
              </p>
            )}
          </div>

          <div className="overflow-x-auto">
            <DndContext
              sensors={useSensors(useSensor(PointerSensor))}
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (active.id !== over?.id) {
                  const oldIndex = fields.findIndex(
                    (item) => item.id === active.id
                  );
                  const newIndex = fields.findIndex(
                    (item) => item.id === over?.id
                  );
                  form.setValue(
                    "groups",
                    arrayMove(fields, oldIndex, newIndex)
                  ); // reorders field array
                }
              }}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Group Number</th>
                      <th>Group Members</th>
                      <th>Roll Number</th>
                      <th>Title</th>
                      <th className="flex justify-end">
                        <button
                          className="btn btn-circle"
                          type="button"
                          onClick={handleAdd}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.length > 0 ? (
                      fields.map((group, index) => (
                        <SortableRow
                          key={group.id}
                          id={group.id}
                        >
                          <th className="cursor-grab">
                            <GripVertical className="w-4 h-4 inline mr-2 opacity-60" />
                            {index + 1}
                          </th>
                          <td>
                            {group.members.map((member, i) => (
                              <p key={i}>
                                {member.name}
                                {member.repeater && "®"}
                              </p>
                            ))}
                          </td>
                          <td>
                            {group.members.map((member, i) => (
                              <p key={i}>{member.rollNo}</p>
                            ))}
                          </td>
                          <td>{group.title}</td>
                          <td className="flex justify-end gap-2">
                            <button
                              className="btn btn-circle btn-secondary"
                              type="button"
                              onClick={() => {
                                handleEdit(index);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="btn btn-circle btn-error"
                              type="button"
                              onClick={() => {
                                handleRemove(index);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </SortableRow>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="h-24 text-center"
                        >
                          No Group
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </SortableContext>
            </DndContext>
            {form.formState.errors.groups && (
              <div
                role="alert"
                className="alert alert-error alert-soft"
              >
                <Info />
                <span>{form.formState.errors.groups.message}</span>
              </div>
            )}
          </div>

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
