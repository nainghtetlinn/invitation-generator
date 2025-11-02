import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type RefObject } from "react";
import { useForm } from "react-hook-form";
import { memberSchema, type Member } from "../lib/schema";

export const MemberDialog = ({
  defaultValues,
  onSubmit,
  ref,
}: {
  defaultValues?: Member;
  onSubmit: (data: Member) => void;
  ref: RefObject<HTMLDialogElement | null>;
}) => {
  const form = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: defaultValues ?? { name: "", rollNo: "", repeater: false },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ name: "", rollNo: "", repeater: false });
    }
  }, [form, defaultValues]);

  const handleSubmit = (data: Member) => {
    onSubmit(data);
    form.reset({ name: "", rollNo: "", repeater: false });
  };

  const handleClose = () => {
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className="modal"
    >
      <main className="modal-box">
        <h3 className="font-bold text-lg mb-2">Member</h3>

        <section className="space-y-4">
          <div>
            <label
              className={`input w-full ${
                form.formState.errors.name && "input-error"
              }`}
            >
              <span className="label">Name</span>
              <input
                type="text"
                placeholder="Tsuki"
                {...form.register("name")}
              />
            </label>
            {form.formState.errors.name && (
              <p className="text-error">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              className={`input w-full ${
                form.formState.errors.rollNo && "input-error"
              }`}
            >
              <span className="label">Roll Number</span>
              <input
                type="text"
                placeholder="2IT-1"
                {...form.register("rollNo")}
              />
            </label>
            {form.formState.errors.rollNo && (
              <p className="text-error">
                {form.formState.errors.rollNo.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <input
                type="checkbox"
                className="checkbox"
                {...form.register("repeater")}
              />
              Repeater ?
            </label>
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
          <button
            className="btn btn-primary"
            type="button"
            onClick={form.handleSubmit(handleSubmit)}
          >
            Save
          </button>
        </div>
      </main>
    </dialog>
  );
};
