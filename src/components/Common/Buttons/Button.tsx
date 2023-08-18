import "font-awesome/css/font-awesome.min.css";

export interface ButtonProps {
  caption: any;
  icon?: string;
  bordered?: boolean;
  disabled?: boolean;
  onClick: any;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`
        solarity-button
        font-medium
         text-gray-200
        p-[22px]
        rounded-[20px]
        w-[100%]
        h-[50px]
        sm:w-[210px] text-[22px]
        sm:text-[18px]
        text-center
        tracking-wider
        inline-flex
        items-center
        justify-center
        font-[Outfit-Regular]
        ${
          props.bordered
            ? "text-lightprimary border-lightprimary border-2"
            : "bg-primary hover:bg-lightprimary"
        }`}
      onClick={props.disabled ? null : props.onClick}
      style={{ pointerEvents: props.disabled ? "none" : "all" }}
    >
      {props.icon ? <i className="fa fa-chrome fa-lg pr-[10px]"></i> : ""}
      <span>{props.caption}</span>
    </button>
  );
};

export default Button;
