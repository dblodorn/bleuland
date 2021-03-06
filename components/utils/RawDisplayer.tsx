export const RawDisplayer = ({data}: {data: any}) => {
  return (
    <div className='code-wrapper'>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </div>
  )
}
