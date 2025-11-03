import { AlertCircle } from "lucide-react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";

export const WarningDialog = ({
  onClick,
  ref,
}: {
  onClick: () => void;
  ref: RefObject<HTMLDialogElement | null>;
}) => {
  return (
    <>
      {createPortal(
        <dialog
          ref={ref}
          className="modal"
        >
          <div className="modal-box bg-base-200">
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-yellow-800 shadow-sm"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-900">
                  Important Notice
                </h3>
                <p className="text-sm leading-relaxed text-yellow-800">
                  This app generates invitation letters using a fixed template
                  created in 2025. After generation, please review the{" "}
                  <strong>downloaded document</strong> and make any necessary
                  updates directly in <strong>Microsoft Word</strong> before
                  using or sharing it.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-yellow-800">
                  Please note that the invitation format may vary between
                  departments. This version was designed based on the{" "}
                  <strong>Information Technology (IT)</strong> major. Other
                  majors may require different formatting or wording.
                </p>
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => ref.current?.close()}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClick();
                  ref.current?.close();
                }}
              >
                Generate
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}
    </>
  );
};
