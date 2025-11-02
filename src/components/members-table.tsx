import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2, GripVertical, Info, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { Group, Member } from "../lib/schema";
import { MemberDialog } from "./member-dialog";

export const MembersTable = ({ form }: { form: UseFormReturn<Group> }) => {
  const memberRef = useRef<HTMLDialogElement>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { fields, append, update, remove, move } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const handleAdd = () => {
    setEditIndex(null);
    memberRef.current?.showModal();
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    memberRef.current?.showModal();
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <MemberDialog
        ref={memberRef}
        defaultValues={editIndex !== null ? fields[editIndex] : undefined}
        onSubmit={(data) => {
          if (editIndex !== null) {
            update(editIndex, data);
            setEditIndex(null);
          } else {
            append(data);
          }
          memberRef.current?.close();
        }}
      />
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
              const newIndex = fields.findIndex((item) => item.id === over?.id);
              move(oldIndex, newIndex);
            }
          }}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <table className="table overflow-hidden">
              <thead>
                <tr>
                  <th></th>
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
                    <MemberItem
                      key={member.id}
                      id={member.id}
                      member={member}
                      index={index}
                      handleEdit={() => handleEdit(index)}
                      handleRemove={() => handleRemove(index)}
                    />
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
          </SortableContext>
        </DndContext>

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
    </>
  );
};

const MemberItem = ({
  id,
  index,
  member,
  handleEdit,
  handleRemove,
}: {
  id: string;
  index: number;
  member: Member;
  handleEdit: () => void;
  handleRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <td
        className="cursor-grab"
        {...listeners}
      >
        <GripVertical className="w-4 h-4 inline mr-2 opacity-60" />
      </td>
      <th>{index + 1}</th>
      <td>
        {member.name} {member.repeater && "®"}
      </td>
      <td>{member.rollNo}</td>
      <td className="flex justify-end gap-2">
        <button
          className="btn btn-circle btn-secondary"
          type="button"
          onClick={handleEdit}
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          className="btn btn-circle btn-error"
          type="button"
          onClick={handleRemove}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
