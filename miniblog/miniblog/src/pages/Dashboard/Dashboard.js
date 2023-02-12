import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'


const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  // post at user
  const {documents: posts, loading } = useFetchDocuments("posts", null, uid);
  
  const { deleteDocument } = useDeleteDocument("posts", uid)

  if(loading)
  {
    return <p>Carregando...</p>
  }

  function deletePost(id)
  {
    let text = "Deseja realmente deletar este post ?";
    if (window.confirm(text)) 
    {
      deleteDocument(id)
    } 
    

  }

  return (
    <div className={styles.dashboard} >
        <h2>Dashboard</h2>
        <p>Gerecie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
            </div>
           { posts && posts.map( (post)=> (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>
                <button onClick={()=> deletePost(post.id)} className="btn btn-outline btn-danger" >Excluir</button>
              </div>
            </div>
           ))}
          </>
        )}


    </div>
  )
}

export default Dashboard