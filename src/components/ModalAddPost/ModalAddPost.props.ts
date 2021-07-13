import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface ModalAddPostProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setShow: (show: boolean) => void
}
