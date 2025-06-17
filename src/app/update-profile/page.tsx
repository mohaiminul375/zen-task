'use client'
import { Button } from "@/components/ui/button";
import DashboardLayout from "../page";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/Provider/AuthProvider";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { useUpdateProfile } from "./api/route";
type Inputs = {
    name: string,
    email: string,
    password: string,
    avatar: string;
}
const UpdateProfile = () => {
    const updateUser = useUpdateProfile();
    const { user } = useAuth();
    const [images, setImages] = useState<ImageListType>([]);
    console.log(images)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    //read the image
    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                } else {
                    reject(new Error("Failed to read file as base64"));
                }
            };

            reader.onerror = () => {
                reject(new Error("Error reading file"));
            };
        });
    };
    // Handle image change
    const handleImageChange = (imageList: ImageListType) => {
        setImages(imageList);
    };
    const onSubmit: SubmitHandler<Inputs> = async (user_data) => {
        console.log(user_data);

        try {
            // If image is provided, upload to ImgBB
            if (images.length > 0 && images[0]?.file) {
                const file = images[0].file;
                const base64Image = await readFileAsBase64(file);

                const { data: res } = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`,
                    { image: base64Image },
                    { headers: { "content-type": "multipart/form-data" } }
                );

                const img_url = res?.data?.display_url;

                if (!img_url) {
                    toast.error('Error from the image server. Please try again or contact the developer.');
                    return;
                }

                user_data.avatar = img_url;
            } else {
                // If no image, use previous avatar
                user_data.avatar = user?.avatar as string;
            }

            console.log(user_data);
            await updateUser.mutateAsync({ _id: user?._id, user_data });
            setImages([]);

        } catch (error) {
            console.error("Error during submission:", error);
            toast.error(error instanceof Error ? error.message : "An error occurred");
        }
    };

    return (
        <DashboardLayout>
            <section className="border max-w-2xl mx-auto p-4 rounded-md py-10 shadow-2xl">
                <div className='text-center '>
                    <h2 className="text-2xl font-semibold">Update Your Profile</h2>
                    <p className=" mt-1">
                        Fill in the form below to Update Your Profile.
                    </p>
                </div>
                <div className="my-2 flex justify-center">
                    {images?.length == 0 && <Avatar>
                        <AvatarImage src={user?.avatar} alt="avatar" />
                        <AvatarFallback />
                    </Avatar>}
                    {images.length > 0 && (
                        <Image
                            height={80}
                            width={80}
                            src={images[0]?.data_url}
                            alt="preview"
                            className=" rounded-full"
                        />
                    )}
                </div>
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5">
                        {/* Name */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="name">
                                Your Name <span className="text-red-600 font-bold">*</span>
                            </Label>
                            <Input
                                defaultValue={user?.name}
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                                required
                                {...register('name')}
                            />
                        </div>
                        {/* Email */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="email">
                                Email <span className="text-red-600 font-bold">*</span>
                            </Label>
                            <Input
                                disabled
                                defaultValue={user?.email}
                                type="email"
                                id="email"
                                placeholder="Enter Email"
                                required
                                {...register('email')}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="nid">Profile Photo<span className='text-red-700 font-bold'>*</span></Label>
                            <ImageUploading

                                multiple
                                value={images}
                                onChange={handleImageChange}
                                dataURLKey="data_url"
                                acceptType={['jpg', 'png', 'jpeg']}

                            >
                                {({ onImageUpload, dragProps }) => (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="default"
                                            className="w-full"
                                            {...dragProps}
                                            onClick={onImageUpload}
                                        >
                                            Upload Image
                                        </Button>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                        {/* Submit */}
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full font-semibold"
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default UpdateProfile;