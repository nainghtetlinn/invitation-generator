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
          <main className="modal-box">
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
