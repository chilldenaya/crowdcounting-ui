import {
  Form,
  Upload,
  Button,
  Card,
  DatePicker,
  Select,
  Image,
  Col,
  Row,
  Modal,
  message,
  Spin,
} from 'antd'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import dayjs from 'dayjs'
import { RcFile } from 'antd/es/upload'

interface DataType {
  titik: string
  tanggal: string
  waktu: string
  jumlah: number
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: 'gate',
    key: 'gate',
    title: 'Titik',
  },
  {
    dataIndex: 'datetime',
    key: 'datetime',
    title: 'Waktu',
  },
  {
    dataIndex: 'count',
    key: 'count',
    title: 'Jumlah',
  },
  {
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
    title: 'Action',
  },
]

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [fileImage, setFileImage] = useState<any>([])

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [prevResult, setPrevResult] = useState(false)

  moment.locale('id')
  const now = dayjs()

  const handleUpload = async (event: any) => {
    setFileImage(event.fileList)
  }

  const handleUploadRemove = async () => {
    setFileImage([])
  }

  const handlePreview = async (file: any) => {
    file.preview = await getBase64(file.originFileObj)
    setPreviewVisible(true)
    setPreviewImage(file.preview)
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  const handleCancel = () => setPreviewVisible(false)

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE
  }

  const fetchData = async () => {
    const response = await fetch('http://154.26.132.120/data')
    const data = await response.json()
    setTableData(data)
  }

  const [tableData, setTableData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://154.26.132.120/data')
      const data = await response.json()
      setTableData(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Form
              style={{ maxWidth: 600 }}
              labelCol={{ span: 4 }}
              layout="horizontal"
              onFinish={(values: any) => {
                const formData = new FormData()
                formData.append('file', fileImage[0].originFileObj)
                formData.append('datetime', values.datetime)
                formData.append('gate', values.gate.value)

                fetch('http://localhost:8000/upload', {
                  body: formData,
                  method: 'POST',
                })
                  .then(response => {
                    response.blob().then(blob => {
                      const url = URL.createObjectURL(blob)
                      setImageUrl(url)
                      setLoading(false)
                      setPrevResult(true)
                      fetchData()
                    })
                  })
                  .catch(error => {
                    console.error(error)
                  })
              }}
            >
              <Form.Item name="file" label="File">
                <Upload
                  onChange={handleUpload}
                  onPreview={handlePreview}
                  onRemove={handleUploadRemove}
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={beforeUpload}
                >
                  {fileImage.length == 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                *only support JPG/PNG file with size less than 2M
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="preview"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
              <Form.Item
                name="gate"
                label="Titik"
                initialValue={{ label: 'Gate 1', value: 'Gate 1' }}
              >
                <Select labelInValue>
                  <Select.Option value="Gate 1">Gate 1</Select.Option>
                  <Select.Option value="Gate 2">Gate 2</Select.Option>
                  <Select.Option value="Gate 3">Gate 3</Select.Option>
                  <Select.Option value="Gate 4">Gate 4</Select.Option>
                  <Select.Option value="Gate 5">Gate 5</Select.Option>
                  <Select.Option value="Gate 6">Gate 6</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="datetime" label="Tanggal" initialValue={now}>
                <DatePicker showTime />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    setLoading(true)
                    setImageUrl('')
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <h1>Result</h1>
            <Row justify="center">
              <Spin tip="Loading..." spinning={loading}></Spin>
            </Row>
            <Row justify="center">
              <Image width={434} src={imageUrl} preview={prevResult} />
            </Row>
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Table columns={columns} dataSource={tableData} />
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  )
}
