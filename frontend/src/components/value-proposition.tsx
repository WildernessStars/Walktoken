import  ValueCard  from "./value-card"

export default function ValueProposition() {
  return (
    <section className="w-full h-screen bg-green-50 justify-center items-center">
      <h2 className="bg-green-50 text-4xl font-bold text-center" >Value Proposition</h2>
      <div className="bg-green-50 space-y-12">
        <ValueCard
          title="Promoting Physical Health"
          description="WalkToken's primary value proposition is to motivate users to walk more, enhancing health and combating sedentary lifestyles. The app improves quality of life and reduces health risks by fostering a community that values and encourages an active lifestyle."
          imageSrc="/images/mountain-lake.jpg"
          imageAlt="Hiker looking at a mountain lake"
          imageNumber={1}
        />
        <ValueCard
          title="Environmental Awareness"
          description="WalkToken promotes environmental sustainability by encouraging walking over driving, reducing carbon emissions and aligning personal health with eco-friendly incentives."
          imageSrc="/images/snowy-mountains.jpg"
          imageAlt="Hiker in snowy mountain landscape"
          imageNumber={2}
        />
      </div>
    </section>
  )
}