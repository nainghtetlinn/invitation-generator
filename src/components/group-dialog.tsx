import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { groupSchema, type Group } from "../lib/schema";
import { MembersTable } from "./members-table";

export const GroupDialog = ({
  defaultValues,
  onSubmit,
  ref,
}: {
  defaultValues?: Group;
  onSubmit: (data: Group) => void;
  ref: RefObject<HTMLDialogElement | null>;
}) => {
  const form = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: defaultValues ?? { title: "", members: [] },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ title: "", members: [] });
    }
  }, [form, defaultValues]);

  const handleSubmit = (data: Group) => {
    onSubmit(data);
    form.reset({ title: "", members: [] });
  };

  const handleClose = () => {
    ref.current?.close();
  };

  return (
    <>
      {createPortal(
        <dialog
          ref={ref}
          className="modal"
        >
          <main className="modal-box bg-base-200">
            <h3 className="font-bold text-lg mb-2">Group</h3>

            <section className="space-y-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Project Title</legend>
                <input
                  type="text"
                  className={`input w-full ${
                    form.formState.errors.title && "input-error"
                  }`}
                  placeholder="Eg. Healthier"
                  {...form.register("title")}
                />
                {form.formState.errors.title && (
                  <p className="text-error label">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </fieldset>

              <MembersTable form={form} />
            </section>

            <div className="modal-action">
              <button
                className="btn"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Save
              </button>
            </div>
          </main>
        </dialog>,
        document.body
      )}
    </>
  );
};
