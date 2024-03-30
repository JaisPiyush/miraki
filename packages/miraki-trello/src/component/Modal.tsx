import { Fragment, useRef, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import Image from 'next/image'; // Import Image component from Next.js

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [newTaskInput, image, addTask, setImage, setNewTaskInput, newTaskType] = useBoardStore((state) => [
    state.newTaskInput,
    state.image,
    state.addTask,
    state.setImage,
    state.setNewTaskInput,
    state.newTaskType
  ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType, image); // Call addTask with the provided parameters
    setImage(null); // Reset the image state
    closeModal(); // Close the modal
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" className="relative z-10" onSubmit={handleSubmit} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className='fixed inset-0 bg-black bg-opacity-25'/>
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child 
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave="ease-in duration-200"
              leaveFrom='opacity-100'
              leaveTo="opacity-0">
              <Dialog.Panel className="max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  Add a Task
                </Dialog.Title>
                <div className='mt-2'>
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder='Enter a Task Here'
                    className='w-full border border-gray-300 rounded-md outline-none p-5'
                  />
                </div>
                <TaskTypeRadioGroup />
                <div className='mt-2'>
                  <button 
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                    className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  >
                    Upload Image
                  </button>
                  {image && (
                    <img
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0] && e.target.files[0].type.startsWith("image/")) {
                        setImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    disabled={!newTaskInput}
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'
                  >
                    Add Task 
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
