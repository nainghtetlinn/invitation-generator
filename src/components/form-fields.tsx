import type { UseFormReturn } from "react-hook-form";
import { DEPARTMENTS, YEARS } from "../lib/constants";
import type { Invitation } from "../lib/schema";

export const FormFields = ({ form }: { form: UseFormReturn<Invitation> }) => {
  const { register, formState } = form;

  return (
    <>
      {/* Department */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Department</legend>
        <select
          {...register("department")}
          className={`select w-full ${
            formState.errors.department && "select-error"
          }`}
        >
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
        {formState.errors.department && (
          <p className="text-error label">
            {formState.errors.department.message}
          </p>
        )}
      </fieldset>

      {/* Year */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Year</legend>
        <select
          {...register("year")}
          className={`select w-full ${formState.errors.year && "select-error"}`}
        >
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
        {formState.errors.year && (
          <p className="text-error label">{formState.errors.year.message}</p>
        )}
      </fieldset>

      {/* Academic */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Academic Year</legend>
        <input
          type="text"
          list="suggestions"
          autoComplete="off"
          className={`input w-full ${
            formState.errors.academic && "input-error"
          }`}
          placeholder="Eg. 2019-2020"
          {...register("academic")}
        />
        <datalist id="suggestions">
          <option
            value={`${
              new Date().getFullYear() - 1
            }-${new Date().getFullYear()}`}
          />
          <option
            value={`${new Date().getFullYear()}-${
              new Date().getFullYear() + 1
            }`}
          />
          <option
            value={`${new Date().getFullYear() + 1}-${
              new Date().getFullYear() + 2
            }`}
          />
        </datalist>
        {formState.errors.academic && (
          <p className="text-error label">
            {formState.errors.academic.message}
          </p>
        )}
      </fieldset>

      {/* Date */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Date</legend>
        <input
          type="date"
          className={`input w-full ${formState.errors.date && "input-error"}`}
          {...register("date")}
        />
        {formState.errors.date && (
          <p className="text-error label">{formState.errors.date.message}</p>
        )}
      </fieldset>

      {/* Time */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Time</legend>
        <input
          type="time"
          className={`input w-full ${formState.errors.time && "input-error"}`}
          {...register("time")}
        />
        {formState.errors.time && (
          <p className="text-error label">{formState.errors.time.message}</p>
        )}
      </fieldset>

      {/* Place */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Place</legend>
        <input
          type="text"
          className={`input w-full ${formState.errors.place && "input-error"}`}
          placeholder="Eg. Seminar room"
          {...register("place")}
        />
        {formState.errors.place && (
          <p className="text-error label">{formState.errors.place.message}</p>
        )}
      </fieldset>
    </>
  );
};
