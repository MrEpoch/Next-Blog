'use client';
import { create_project } from "@/lib/api";
import Modal from "react-modal";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

export default function NewProject() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const [name, setName] = useState("");

    const handleSubmit = async (data: FormData) => {
        await create_project(data);
        closeModal();
        return;
    }

    return (
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
            <Button onClick={openModal}>+ New Project</Button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-3/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6">New Project</h1>
                <form action={handleSubmit} className="flex items-center">
                    <Input placeholder="Project Name" className="" name="name"/>
                    <Button type="submit" >Create</Button>
                </form>
            </Modal>
        </div>
    )
}
