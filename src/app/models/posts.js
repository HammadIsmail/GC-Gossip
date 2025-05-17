import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  header: { type: String, required: true },
  body: { type: String, required: true },
  department: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
