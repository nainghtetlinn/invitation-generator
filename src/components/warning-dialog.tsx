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
                  အရေးကြီး အသိပေးချက်
                </h3>
                <p className="text-sm leading-relaxed text-yellow-800">
                  ဤ Application သည် ၂၀၂၅ ခုနှစ် ပုံစံ (Fixed Template) ကို
                  အသုံးပြုထားပါသည်။ ထို့ကြောင့် စာထုတ်ယူပြီးပါက{" "}
                  <strong>ဒေါင်းလုဒ်ရယူထားသော ဖိုင်</strong> ကို သေချာစွာ
                  ပြန်လည်စစ်ဆေးပြီး၊ အသုံးမပြုမီ သို့မဟုတ် သူတစ်ပါးထံ မပေးပို့မီ{" "}
                  <strong>Microsoft Word</strong> တွင် လိုအပ်သည်များကို
                  တိုက်ရိုက် ပြင်ဆင်ဖြည့်စွက်ပေးပါ။
                </p>
                <p className="mt-2 text-sm leading-relaxed text-yellow-800">
                  ဌာနအလိုက် ဖိတ်ကြားစာပုံစံများ ကွဲပြားနိုင်သည်ကို သတိပြုပါ။
                  ဤပုံစံသည် <strong>Information Technology (IT)</strong>{" "}
                  မေဂျာအတွက် ရည်ရွယ်ပြီး ပြုလုပ်ထားခြင်းဖြစ်သည့်အတွက်
                  အခြားမေဂျာများအနေဖြင့် ပုံစံ သို့မဟုတ် စာသားအသုံးအနှုန်း
                  အပြောင်းအလဲရှိနိုင်ပါသည်။
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
