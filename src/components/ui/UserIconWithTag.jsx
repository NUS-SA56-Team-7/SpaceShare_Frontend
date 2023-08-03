import Badge from "./Badge";

const UserIconWithTag = ({ imgUrl, username, status }) => {
    return (
        <div class="grid grid-cols-2 my-4 items-center">
            <div class="flex items-center">
                <div class="relative flex rounded-full text-sm">
                    <span className="absolute -inset-1.5" />
                    <img
                        className="h-8 w-8 rounded-full"
                        src={imgUrl}
                        alt="profile-img"
                    />
                </div>

                <p class="ml-2 text-gray-800 line-clamp-1 text-sm">
                    {username}
                </p>
            </div>
            <Badge status="success">
                Verified
            </Badge>
        </div>
    )
}

export default UserIconWithTag;