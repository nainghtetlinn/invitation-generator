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
import type { Group, Invitation } from "../lib/schema";
import { GroupDialog } from "./group-dialog";

export const GroupsTable = ({ form }: { form: UseFormReturn<Invitation> }) => {
  const groupRef = useRef<HTMLDialogElement>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { fields, append, update, remove, move } = useFieldArray({
    control: form.control,
    name: "groups",
  });

  const handleAdd = () => {
    setEditIndex(null);
    groupRef.current?.showModal();
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    groupRef.current?.showModal();
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <GroupDialog
        ref={groupRef}
        defaultValues={editIndex !== null ? fields[editIndex] : undefined}
        onSubmit={(data) => {
          if (editIndex !== null) {
            update(editIndex, data);
            setEditIndex(null);
          } else {
            append(data);
          }
          groupRef.current?.close();
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
                    <GroupItem
                      key={group.id}
                      id={group.id}
                      group={group}
                      index={index}
                      handleEdit={() => handleEdit(index)}
                      handleRemove={() => handleRemove(index)}
                    />
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
            className="alert alert-error alert-soft mt-2"
          >
            <Info />
            <span>{form.formState.errors.groups.message}</span>
          </div>
        )}
      </div>
    </>
  );
};

const GroupItem = ({
  id,
  index,
  group,
  handleEdit,
  handleRemove,
}: {
  id: string;
  index: number;
  group: Group;
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
      <td>{index + 1}</td>
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
