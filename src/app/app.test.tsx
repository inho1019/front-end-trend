import { getData } from "../shared/api/get/get-data"
import { useId, useState } from "react"
import type { Site } from "../shared/model/site"
import { addData } from "../shared/api/set/add-data"

function App() {
  const id = useId()
  const [token, setToken] = useState<string>('')
  const [formData, setFormData] = useState<Site>({
    id: id,
    url: '',
    name: '',
    description: '',
    type: {
      title: '',
      content: '',
      thumbnail: '',
      createdAt: ""
    }
  })

  const handleGetData = async () => {
    try {
      const { data } = await getData()
      console.log("Retrieved data:", data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('type.')) {
      const typeField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        type: {
          ...prev.type,
          [typeField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addData(token, formData)
    alert("Data added successfully!");
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>데이터 입력 폼</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="token" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Token
          </label>
          <input
            id="token"
            type="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="github token"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label htmlFor="url" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            URL:
          </label>
          <input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
            placeholder="예: www.naver.com"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            이름:
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="예: Naver"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            설명:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="예: Naver is a South Korean online platform..."
            rows={3}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>

        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px', backgroundColor: '#cccccc' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Type 정보:</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="type-title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title:
            </label>
            <input
              id="type-title"
              type="text"
              value={formData.type.title}
              onChange={(e) => handleInputChange('type.title', e.target.value)}
              placeholder="예: title"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="type-content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Content:
            </label>
            <input
              id="type-content"
              type="text"
              value={formData.type.content}
              onChange={(e) => handleInputChange('type.content', e.target.value)}
              placeholder="예: content"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label htmlFor="type-thumbnail" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Thumbnail:
            </label>
            <input
              id="type-thumbnail"
              type="text"
              value={formData.type.thumbnail}
              onChange={(e) => handleInputChange('type.thumbnail', e.target.value)}
              placeholder="예: picture"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit"
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            데이터 저장
          </button>
          
          <button 
            type="button"
            onClick={handleGetData}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            getData
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
