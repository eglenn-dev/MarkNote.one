'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from 'lucide-react'
import NoteModal from './note-modal'
import ContextMenu from './context-menu'

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  lastUpdated: string;
}

interface PostListProps {
  initialPosts: Post[]
}

export default function PostList({ initialPosts }: PostListProps) {
  const posts = initialPosts;
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; postId: string } | null>(null)

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
    setIsModalOpen(false)
  }

  const handleContextMenu = (e: React.MouseEvent, postId: string) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, postId })
  }

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Link href="/new-note">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Note
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <Link href={`/note/${post.id}`} key={post.id} onContextMenu={(e) => handleContextMenu(e, post.id)}>
            <Card
              className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <CardHeader className='pb-2'>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  Last updated: {new Date(post.lastUpdated).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No notes found. Create a new one!</p>
      )}
      <NoteModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          post={initialPosts.find(post => post.id === contextMenu.postId)}
          postClick={handlePostClick}
        />
      )}
    </div>
  )
}

