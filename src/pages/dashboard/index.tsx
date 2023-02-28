import {
  Form,
  Upload,
  Button,
  Card,
  TimePicker,
  DatePicker,
  Select,
  Image,
  Col,
  Row,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

export default function Home() {
  const timeFormat = 'HH:mm'

  return (
    <>
      <Row>
        <Col span={12}>
          <Card style={{ width: '100%' }}>
            <Form
              style={{ maxWidth: 600 }}
              labelCol={{ span: 4 }}
              layout="horizontal"
            >
              <Form.Item label="Upload" valuePropName="fileList">
                <Upload listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="Titik">
                <Select>
                  <Select.Option value="gate1">Gate 1</Select.Option>
                  <Select.Option value="gate2">Gate 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Tanggal">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Waktu">
                <TimePicker format={timeFormat} />
              </Form.Item>
            </Form>
            <Form.Item>
              <Button block type="primary">
                Submit
              </Button>
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: '100%' }}>
            <h1>Result</h1>
            <Image width={434} src="/output.jpeg" />
          </Card>
        </Col>
      </Row>
    </>
  )
}
