import { useState } from 'react'
import { CalendarDays, MessageCircle, Send, Vote } from 'lucide-react'
import { POST_TYPES, REACTIONS } from '../../data/data.js'
import { useApp } from '../../context/AppContext.jsx'
import { timeAgo } from '../../utils/helpers.js'

const typeIcon = { atualizacao: MessageCircle, prestacao: CalendarDays, votacao: Vote }

function PostCard({ post, project, data, editMode, addComment, toggleReaction }) {
  const [comment, setComment] = useState('')
  const Icon = typeIcon[post.type] || MessageCircle

  const submitComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    addComment(post.id, comment)
    setComment('')
  }

  return (
    <article className="card animate-fade-in p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-civic-raised text-sm font-semibold text-civic-cyan" aria-hidden="true">
          {data.profile.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-semibold text-white">{data.profile.name}</h3>
            <span className="chip"><Icon className="h-3.5 w-3.5" aria-hidden="true" />{POST_TYPES[post.type]?.label || 'Atualização'}</span>
            <time className="text-xs text-civic-muted" dateTime={post.createdAt}>{timeAgo(post.createdAt)}</time>
          </div>
          {project && (
            <p className="mt-1 text-xs text-civic-muted">
              Em <span className="font-mono text-civic-cyan">{project.number}</span> · {project.title}
            </p>
          )}
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-civic-text">{post.content}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {REACTIONS.map((reaction) => {
              const pressed = (data.viewer.reactions[post.id] || []).includes(reaction.id)
              return (
                <button
                  type="button"
                  key={reaction.id}
                  onClick={() => toggleReaction(post.id, reaction.id)}
                  aria-pressed={pressed}
                  aria-label={`${reaction.label}: ${post.reactions[reaction.id] || 0}`}
                  className={`rounded-full border px-2.5 py-1 text-xs transition ${pressed ? 'border-civic-cyan/60 bg-civic-cyan/10 text-civic-cyan' : 'border-civic-line bg-civic-bg text-civic-muted hover:border-civic-cyan/50 hover:text-civic-text'}`}
                >
                  {reaction.emoji} {post.reactions[reaction.id] || 0}
                </button>
              )
            })}
            <span className="ml-auto inline-flex items-center gap-1.5 self-center text-xs text-civic-muted">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {post.comments.length} comentários
            </span>
          </div>

          {post.comments.length > 0 && (
            <div className="mt-4 space-y-3 border-t border-civic-line pt-4">
              {post.comments.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${item.isAuthor ? 'bg-civic-cyan/15 text-civic-cyan' : 'bg-civic-raised text-civic-muted'}`} aria-hidden="true">
                    {item.initials}
                  </div>
                  <div className="min-w-0 flex-1 rounded-md bg-civic-bg/70 px-3 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-civic-text">{item.author}</span>
                      {item.isAuthor && <span className="rounded bg-civic-cyan/10 px-1.5 py-0.5 text-[10px] text-civic-cyan">Autora</span>}
                      <time className="text-[10px] text-civic-muted" dateTime={item.createdAt}>{timeAgo(item.createdAt)}</time>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-civic-text">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={submitComment} className="mt-4 flex items-center gap-2">
            <label className="sr-only" htmlFor={`comment-${post.id}`}>Escreva um comentário</label>
            <input
              id={`comment-${post.id}`}
              className="input py-2"
              placeholder={editMode ? 'Responder como Helena…' : 'Escreva um comentário…'}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              maxLength={500}
            />
            <button type="submit" className="btn btn-primary shrink-0" disabled={!comment.trim()} aria-label="Publicar comentário">
              <Send className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>
        </div>
      </div>
    </article>
  )
}

export default function Feed() {
  const { data, editMode, addComment, toggleReaction } = useApp()

  return (
    <section className="animate-fade-in space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Atualizações</h2>
        <p className="mt-1 text-sm text-civic-muted">Acompanhe as atividades e participe da conversa.</p>
      </div>
      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          project={data.projects.find((item) => item.id === post.projectId)}
          data={data}
          editMode={editMode}
          addComment={addComment}
          toggleReaction={toggleReaction}
        />
      ))}
      {!data.posts.length && <div className="card p-8 text-center text-sm text-civic-muted">Nenhuma atualização publicada ainda.</div>}
    </section>
  )
}
