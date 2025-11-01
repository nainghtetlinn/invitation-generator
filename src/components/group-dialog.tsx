import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Info, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { groupSchema, type Group } from "../lib/schema";
import { MemberDialog } from "./member-dialog";

export const GroupDialog = ({
  defaultValues,
  onSubmit,
  ref,
}: {
  defaultValues?: Group;
  onSubmit: (data: Group) => void;
  ref: RefObject<HTMLDialogElement | null>;
}) => {
  const memberRef = useRef<HTMLDialogElement>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: defaultValues ?? { title: "", no: "", members: [] },
  });

  const {
    fields,
    append: appendMember,
    update: updateMember,
    remove: removeMember,
  } = useFieldArray({
    control: form.control,
    name: "members",
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ title: "", no: "", members: [] });
    }
  }, [form, defaultValues]);

  const handleSubmit = (data: Group) => {
    onSubmit(data);
    form.reset({ title: "", no: "", members: [] });
  };

  const handleClose = () => {
    ref.current?.close();
  };

  const handleAdd = () => {
    setEditIndex(null);
    memberRef.current?.showModal();
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    memberRef.current?.showModal();
  };

  const handelRemove = (index: number) => {
    removeMember(index);
  };

  return (
    <>
      <MemberDialog
        ref={memberRef}
        defaultValues={editIndex !== null ? fields[editIndex] : undefined}
        onSubmit={(data) => {
          if (editIndex !== null) {
            updateMember(editIndex, data);
            setEditIndex(null);
          } else {
            appendMember(data);
          }
          memberRef.current?.close();
        }}
      />
      <dialog
        ref={ref}
        className="modal"
      >
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="modal-box"
        >
          <h3 className="font-bold text-lg mb-2">Group</h3>

          <section className="space-y-4">
            <div>
              <label
                className={`input w-full ${
                  form.formState.errors.title && "input-error"
                }`}
              >
                <span className="label">Group Title</span>
                <input
                  type="text"
                  placeholder="Healthier"
                  {...form.register("title")}
                />
              </label>
              {form.formState.errors.title && (
                <p className="text-error">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                className={`input w-full ${
                  form.formState.errors.no && "input-error"
                }`}
              >
                <span className="label">Group Number</span>
                <input
                  type="text"
                  placeholder="Group I"
                  {...form.register("no")}
                />
              </label>
              {form.formState.errors.no && (
                <p className="text-error">{form.formState.errors.no.message}</p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Roll Number</th>
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
                    fields.map((member, index) => (
                      <tr key={member.id}>
                        <th>{index + 1}</th>
                        <td>
                          {member.name} {member.repeater && "®"}
                        </td>
                        <td>{member.rollNo}</td>
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
                              handelRemove(index);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="h-24 text-center"
                      >
                        No Member
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {form.formState.errors.members && (
                <div
                  role="alert"
                  className="alert alert-error alert-soft"
                >
                  <Info />
                  <span>{form.formState.errors.members.message}</span>
                </div>
              )}
            </div>
          </section>

          <div className="modal-action">
            <button
              className="btn"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </dialog>
    </>
  );
};
