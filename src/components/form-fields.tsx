import type { UseFormReturn } from "react-hook-form";
import { DEPARTMENTS, YEARS } from "../lib/constants";
import type { Invitation } from "../lib/schema";

export const FormFields = ({ form }: { form: UseFormReturn<Invitation> }) => {
  const { register, formState } = form;

  return (
    <>
      {/* Department */}
      <div>
        <label
          className={`select w-full ${
            formState.errors.department && "select-error"
          }`}
        >
          <span className="label">Department</span>
          <select {...register("department")}>
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
        {formState.errors.department && (
          <p className="text-error">{formState.errors.department.message}</p>
        )}
      </div>

      {/* Year */}
      <div>
        <label
          className={`select w-full ${formState.errors.year && "select-error"}`}
        >
          <span className="label">Year</span>
          <select {...register("year")}>
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
        {formState.errors.year && (
          <p className="text-error">{formState.errors.year.message}</p>
        )}
      </div>

      {/* Academic */}
      <div>
        <label
          className={`input w-full ${
            formState.errors.academic && "input-error"
          }`}
        >
          <span className="label">Academic</span>
          <input
            type="text"
            placeholder="2019-2020"
            {...register("academic")}
          />
        </label>
        {formState.errors.academic && (
          <p className="text-error">{formState.errors.academic.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label
          className={`input w-full ${formState.errors.date && "input-error"}`}
        >
          <span className="label">Date</span>
          <input
            type="date"
            {...register("date")}
          />
        </label>
        {formState.errors.date && (
          <p className="text-error">{formState.errors.date.message}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <label
          className={`input w-full ${formState.errors.time && "input-error"}`}
        >
          <span className="label">Time</span>
          <input
            type="time"
            {...register("time")}
          />
        </label>
        {formState.errors.time && (
          <p className="text-error">{formState.errors.time.message}</p>
        )}
      </div>

      {/* Place */}
      <div>
        <label
          className={`input w-full ${formState.errors.place && "input-error"}`}
        >
          <span className="label">Place</span>
          <input
            type="text"
            placeholder="Seminar room"
            {...register("place")}
          />
        </label>
        {formState.errors.place && (
          <p className="text-error">{formState.errors.place.message}</p>
        )}
      </div>
    </>
  );
};
