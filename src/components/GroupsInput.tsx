import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { groupsSchema, type Groups } from "../lib/schema";

const GroupsInput = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Groups>({
    resolver: zodResolver(groupsSchema),
    defaultValues: {
      groups: [
        { title: "", members: [{ name: "", roll: "", repeater: false }] },
      ],
    },
  });

  const { fields, append } = useFieldArray({ control, name: "groups" });

  const lastGroupIndex = fields.length - 1;

  const lastGroupTitle = watch(`groups.${lastGroupIndex}.title`);
  const firstMemberName = watch(`groups.${lastGroupIndex}.members.0.name`);

  const onSubmit = (data: Groups) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col items-center"
    >
      {fields.map((group, i) => {
        return (
          <div
            key={group.id}
            className="w-full"
          >
            <h5 className="font-semibold">Group {i + 1}</h5>
            <div className="pb-2">
              <label className="w-full input">
                <span className="label">Title</span>
                <input
                  type="text"
                  placeholder="Eg. Attendance System"
                  {...register(`groups.${i}.title`)}
                />
              </label>
            </div>
            <ul className="pl-4 space-y-1">
              <li className="border-l pl-2 py-1">
                <h6 className="text-xs font-semibold mb-1">Member {0 + 1}</h6>
                <label className="w-full mb-1 input input-sm">
                  <span className="label">Name</span>
                  <input
                    type="text"
                    placeholder="Eg. Mg Mg"
                  />
                </label>
                <label className="w-full input input-sm">
                  <span className="label">Roll No.</span>
                  <input
                    type="text"
                    placeholder="Eg. 1IT-1"
                  />
                </label>
              </li>
            </ul>
          </div>
        );
      })}

      <button
        type="button"
        className="btn btn-primary w-full"
        disabled={!lastGroupTitle || !firstMemberName}
        onClick={() =>
          append({
            title: "",
            members: [{ name: "", roll: "", repeater: false }],
          })
        }
      >
        Add Group
      </button>

      <div className="w-full flex justify-end gap-2">
        <button
          type="button"
          className="btn"
        >
          Back
        </button>
        <button className="btn btn-primary">Next</button>
      </div>
    </form>
  );
};

export default GroupsInput;
