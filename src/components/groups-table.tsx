import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Edit2, GripVertical, Plus, Trash2, Info } from "lucide-react";
import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import type { Invitation } from "../lib/schema";
import { SortableRow } from "./sortable-row";

interface Props {
  fields: FieldArrayWithId<Invitation, "groups", "id">[];
  form: UseFormReturn<Invitation>;
  handleAdd: () => void;
  handleEdit: (index: number) => void;
  handleRemove: (index: number) => void;
}

export const GroupsTable = ({
  fields,
  form,
  handleAdd,
  handleEdit,
  handleRemove,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <DndContext
        sensors={useSensors(useSensor(PointerSensor))}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over?.id);
            form.setValue("groups", arrayMove(fields, oldIndex, newIndex));
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
          className="alert alert-error alert-soft mt-2"
        >
          <Info />
          <span>{form.formState.errors.groups.message}</span>
        </div>
      )}
    </div>
  );
};
