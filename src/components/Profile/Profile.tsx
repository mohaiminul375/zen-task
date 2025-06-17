'use Client'

import { useAuth } from "@/Provider/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Profile = () => {
    const { user } = useAuth();
    return (
        <section className="flex justify-center items-center flex-col space-y-3">
            <Avatar>
                <AvatarImage src={user?.avatar} alt="avatar" />
                <AvatarFallback />
            </Avatar>
            <div className="text-center flex flex-col justify-center">
                <h2 className="text-lg font-bold">{user?.name}</h2>
                <h5 className="text-center text-base">{user?.email}</h5>
            </div>
        </section>
    );
};

export default Profile;