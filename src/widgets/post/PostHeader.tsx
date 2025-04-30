import { Button, CardTitle } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { usePostHandlers } from '@/entities/post/model/usePostHandlers';

export const PostHeader = () => {
  const { setShowAddDialog } = usePostHandlers();
  return (
    <CardTitle className="flex items-center justify-between">
      <span>게시물 관리자</span>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    </CardTitle>
  );
};
