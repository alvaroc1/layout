import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'

ReactDOM.render(
  <Layout.layout height='fill' width='fill' background='red'>
    <Layout.el centerX centerY background='green'>
      <Layout.row width={600} height={200}>
        <Layout.el height='fill' fillPortion={1} padding={[10, 20]} spacing={10}>
          <Layout.el background='yellow' width='fill' outline='2px solid lime'>Step 1</Layout.el>
          <Layout.el background='yellow' width='fill'>Step 2</Layout.el>
        </Layout.el>
        <Layout.column height='fill' background='blue' fillPortion={5}>
          <Layout.el width='fill' padding={[10, 20]}>Header</Layout.el>
          <Layout.el width='fill' fillPortion={1} scrollbarY>
            <Layout.el height={300} onClick={() => console.log("CLICK")}>
              Content
            </Layout.el>
            <Layout.el>
              <div style={{height: 200}}>Content2</div>
            </Layout.el>
            <Layout.el>
              <div style={{height: 200}}>Content2</div>
            </Layout.el>
          </Layout.el>
          <Layout.el width='fill'>Footer</Layout.el>
        </Layout.column>
      </Layout.row>
    </Layout.el>
  </Layout.layout>,
  document.getElementById('root')
)
