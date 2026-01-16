import Link from "next/link";

interface ItemTypeCard {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  _createdAt: string;
}

const Card = ({ post }: { post: ItemTypeCard }) => {
  return (
    <li className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition p-4 border border-gray-100">
      
      <div className="w-full h-40 bg-green-100 flex items-center justify-center text-green-600 text-xl font-semibold">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          "No Image"
        )}
      </div>

      
      <div className="mt-4 space-y-2">
        <span className="text-sm text-green-600 font-medium">
          {post.category}
        </span>

        <h3 className="text-xl font-semibold text-gray-800">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm">{post.description}</p>

        <div className="text-xs text-gray-400">Added: {post._createdAt}</div>
        <button className="bg-green-500 px-4 rounded-lg">
            <Link href={`/item/${post._id}`} className="text-green-800">Details</Link>
        </button>
      </div>
    </li>
  );
};

export default Card;
