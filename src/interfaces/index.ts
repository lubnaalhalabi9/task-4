import type { SetStateAction } from "react";

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_image?: Blob | null;
}

export interface FormProps1 {
    title : string;
    paragraph : string;
    inputs : Array<Input>;
    submit : string;
    setData : React.Dispatch<React.SetStateAction<SignInData | SignUpData>>;
    footer?: React.ReactNode;
    error?: string;
    isLoading?: boolean;
}

export interface Input {
    name: string;
    type: string;
    label?: string;
    placeholder: string;
    value?: string;
}

export interface Item {
    id: number;
    name: string;
    price: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export type ItemCreated = Omit<Item, "id" | "created_at" | "updated_at" | "image_url">
&{
    image: Blob 
}

export interface FormProps2 {
    title : string,
    inputs : Array<Input>,
    submit : string,
    setData : React.Dispatch<SetStateAction<SignInData | SignUpData | ItemCreated >>
}

export interface AddEditFormProps {
    title: string
    submit : string
    inputs: Array<Input>
    setData : React.Dispatch<React.SetStateAction<SignInData | SignUpData | ItemCreated >>
    setSubmit : React.Dispatch<React.SetStateAction<boolean>>
}

export interface SidebarProps {
    userName?: string
    userImage?: string
    isOpen?: boolean
    onClose?: () => void
}