import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@ppqitadb.nytneum.mongodb.net/development",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {}
};

connectMongoDB();

const Post = mongoose.model(
  "blog",
  new mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  })
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: true, message: "mehtod tidak diijinkan" });
  }

  const { title, content } = req.body;
  // validasi kosong atau tidak
  if (!title) {
    return res.status(400).json({ error: true, message: "tidak ada title" });
  }

  if (!content) {
    return res.status(400).json({ error: true, message: "tidak ada content" });
  }

  // validasi sesuai kreteria atau tidak
  if (title < 3 || title > 20) {
    return res.status(400).json({
      error: true,
      message: "title harus diantar 3 sampai 20 karakter",
    });
  }

  if (content < 3 || content > 50) {
    return res.status(400).json({
      error: true,
      message: "content harus diantar 3 sampai 50 karakter",
    });
  }

  // jika sudah sesuai simpan
  const post = new Post({ title, content });
  await post.save();

  // kasih tahu client
  return res.status(201).json(post);
}
