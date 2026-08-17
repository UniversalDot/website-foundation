import fig1 from "../../assets/implicit-fig1.png";
import fig2 from "../../assets/implicit-fig2.png";
import table1 from "../../assets/implicit-table1.png";

const ImplicitDehazingArticleContent = () => {
  return (
    <div className="space-y-6 font-['Source_Serif_4',Georgia,serif] text-lg leading-[1.8] text-gray-800">
      <h3 className="mt-10 text-2xl font-bold text-gray-900">Abstract</h3>
      <p>
        Semantic segmentation in adverse weather conditions, particularly heavy
        fog, remains a critical vulnerability for Level 4 and Level 5 autonomous
        vehicle perception systems. Traditional computational solutions rely on
        explicit two-stage pipelines deploying a dedicated image dehazing network
        followed sequentially by a semantic segmentation model or joint networks
        that still computationally reconstruct clear images via heavy decoders.
        These approaches suffer from severe latency bottlenecks, rendering them
        unsuitable for real-time edge computing, and exhibit severe error
        propagation, where dehazing color artifacts explicitly degrade downstream
        segmentation accuracy.
      </p>
      <p>
        In this paper, we propose a novel, highly optimized single-stage
        architecture titled Implicit Dehazing in Feature Space. Instead of
        explicitly reconstructing a clear RGB image, our network optimizes fog
        removal mathematically within the latent feature space using a custom,
        differentiable Dark Channel Prior (DCP) loss function. By dropping the
        image reconstruction head entirely during inference, the model achieves
        domain-invariant embeddings without the computational overhead of pixel
        generation. Extensive evaluations on a dynamically injected foggy
        Cityscapes dataset demonstrate that our proposed model achieves a 58%
        increase in inference speed (operating at ~311 FPS) while simultaneously
        improving mean Intersection over Union (mIoU) to 40.77% over the
        explicit two-stage baseline. Furthermore, latent space t-SNE analysis
        and safety-critical class evaluations (specifically targeting pedestrians
        and vehicles) mathematically prove the architecture's superior geometric
        preservation of distant hazards under varying atmospheric scattering
        parameters (β).
      </p>

      <h3 className="mt-10 text-2xl font-bold text-gray-900">Introduction</h3>
      <p>
        Robust environmental perception is the foundational pillar of Intelligent
        Transportation Systems (ITS) and autonomous navigation. The safety of
        autonomous vehicles relies entirely on the precise, real-time pixel-wise
        classification of the surrounding environment, a task performed by Deep
        Neural Networks (DNNs) through semantic segmentation. While modern
        architectures have achieved superhuman accuracy in clear weather
        conditions, their performance degrades catastrophically in the presence
        of atmospheric scattering, such as heavy fog, rain, or snow.
      </p>
      <p>
        Fog introduces severe visual occlusion, exponential contrast reduction as
        a function of depth, and significant color shifts. These atmospheric
        phenomena destroy the high-frequency structural details and clear
        boundaries required for accurate semantic segmentation. Consequently,
        Semantic Foggy Scene Segmentation (SFSS) has become a primary focus in
        autonomous driving research.
      </p>
      
      <h4 className="mt-6 text-xl font-semibold text-gray-900">
        The Flaws of Explicit Image Restoration
      </h4>
      <p>
        Current approaches primarily rely on explicit image restoration
        methodologies. A standard baseline utilizes a two-stage pipeline: a
        pre-processing dehazing network attempts to clear the input image,
        generating a restored RGB tensor which is subsequently fed into an
        independent segmentation network. However, this explicit methodology
        introduces two critical flaws:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-semibold">Computational Latency:</span>{" "}
          Processing sequential, deep convolutional neural networks creates a
          massive computational bottleneck. The requirement to first decode latent
          features back into a high-resolution image space, only to re-encode
          them for segmentation, prevents the real-time frame rates (often
          requiring 60 FPS) necessary for split-second driving decisions on
          embedded edge hardware.
        </li>
        <li>
          <span className="font-semibold">Error Propagation:</span> Explicit
          dehazers are inherently imperfect; they frequently hallucinate textures,
          amplify noise, or introduce structural color artifacts in regions of
          dense fog. The downstream segmentation network misinterprets these
          artifacts, leading to misclassification of safety-critical objects.
        </li>
      </ul>

      <p>
        To address these limitations, we propose a paradigm shift from explicit
        image restoration to <strong>implicit feature restoration</strong>. We
        introduce a single-stage neural network that mathematically filters
        atmospheric fog directly within the latent feature space. By utilizing a
        customized, differentiable Dark Channel Prior (DCP) loss function during
        the training phase, the network is forced to generate domain-invariant
        embeddings—treating foggy and clear scenes as mathematically identical
        before reaching the segmentation head.
      </p>

      <figure className="my-8">
        <img src={fig1} alt="The Paradigm Shift: Explicit vs. Implicit Dehazing" className="w-full rounded-sm object-contain shadow-sm border border-gray-100" />
        <figcaption className="mt-3 text-sm text-gray-600">
          <strong>Figure 1: The Paradigm Shift: Explicit vs. Implicit Dehazing.</strong> The baseline explicitly reconstructs a clean image space, causing immense computational latency and error propagation. Our proposed method performs mathematical dehazing entirely within the 512-dimensional latent feature space, bypassing the RGB bottleneck.
        </figcaption>
      </figure>

      <h3 className="mt-10 text-2xl font-bold text-gray-900">
        Proposed Methodology
      </h3>
      <p>
        The core philosophy of our proposed architecture is rooted in
        computational efficiency for autonomous agents: the vehicle's perception
        system does not need to <em>see</em> a clear picture; it only needs to{" "}
        <em>calculate</em> a clear semantic map. By migrating the dehazing
        process from the image space to the feature space, we optimize both
        latency and accuracy. This paradigm shift entirely eliminates the
        latency-heavy explicit reconstruction step, directly mapping foggy inputs
        to a latent feature space for seamless semantic parsing.
      </p>

      <h4 className="mt-6 text-xl font-semibold text-gray-900">
        Network Architecture
      </h4>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-semibold">1) Shared Latent Encoder:</span> We
          utilize a ResNet-18 backbone as the primary feature extractor. As the
          foggy input image passes through the convolutional layers, it ultimately
          produces a 512-dimensional latent feature tensor. Our goal is to ensure
          this bottleneck remains domain-invariant.
        </li>
        <li>
          <span className="font-semibold">2) Semantic Segmentation Head:</span> A
          lightweight convolutional classification head acts directly upon the
          512-dimensional latent features, utilizing Atrous Spatial Pyramid
          Pooling (ASPP) to map features to a 14-class semantic probability map.
        </li>
        <li>
          <span className="font-semibold">3) Training-Only Reconstruction Head:</span>{" "}
          To mathematically enforce fog removal, we introduce a mirrored
          convolutional decoder. Crucially, this head is governed by a strict
          conditional execution parameter. During training, this head outputs an
          image used to calculate physical fog loss. During inference (deployment
          on the vehicle), this branch is completely disabled.
        </li>
      </ul>

      <h4 className="mt-6 text-xl font-semibold text-gray-900">
        Implicit Dehazing via Feature-Space DCP Loss
      </h4>
      <p>
        To force the shared encoder to filter fog implicitly, we optimize the
        network using a joint loss function consisting of standard Cross-Entropy
        segmentation loss and a customized Dark Channel Prior (DCP) loss. We
        translate the traditional physical DCP into a differentiable PyTorch loss
        function applied to the output of our training-only reconstruction head.
        By penalizing the network when the dark channel of its reconstructed
        image deviates from zero, we force the gradients to flow backward into
        the shared ResNet encoder, altering its weights to mathematically filter
        out the "whiteness" of the fog.
      </p>

      <figure className="my-8">
        <img src={fig2} alt="Training vs. Inference Architecture" className="w-full rounded-sm object-contain shadow-sm border border-gray-100" />
        <figcaption className="mt-3 text-sm text-gray-600">
          <strong>Figure 2: Training vs. Inference Architecture.</strong> Left: During training, the latent features are passed to both the segmentation head (CE Loss) and the reconstruction head (DCP Loss). Right: During real-time deployment, the explicit reconstruction head is entirely disabled, bypassing computational latency.
        </figcaption>
      </figure>

      <h3 className="mt-10 text-2xl font-bold text-gray-900">
        Quantitative and Qualitative Results
      </h3>
      <p>
        To simulate adverse weather conditions, we implemented a custom dynamic
        atmospheric scattering module on the Cityscapes dataset, allowing us to
        inject continuous spectrums of atmospheric scattering in real-time.
      </p>

      <figure className="my-8">
        <img src={table1} alt="Table 1: Comprehensive Quantitative Evaluation on the Foggy Cityscapes Dataset" className="w-full rounded-sm object-contain shadow-sm border border-gray-100" />
        <figcaption className="mt-3 text-sm text-gray-600">
        </figcaption>
      </figure>

      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-semibold">Computational Efficiency:</span> The
          baseline explicit pipeline (AOD-Net + Segmentation) achieved an average
          inference speed of ~197 FPS. Our proposed implicit architecture achieved
          an inference speed of <strong>~311 FPS</strong>, a massive 58%
          increase in computational speed, fundamentally proving viability for
          real-time edge computing.
        </li>
        <li>
          <span className="font-semibold">Semantic Accuracy:</span> The baseline
          achieved a terminal mIoU of 38.68%. In contrast, the proposed implicit
          network achieved <strong>40.77% mIoU</strong>. This proves that
          treating the fog mathematically in the continuous feature space prevents
          destructive artifact generation.
        </li>
        <li>
          <span className="font-semibold">Safety-Critical Class Breakdown:</span>{" "}
          The implicit architecture outperformed the heavy two-stage baseline on 4
          out of 5 life-or-death classes (Cars, Trucks, Pedestrians, Traffic
          Signs), demonstrating a highly significant gain in preserving the
          geometric boundaries of distant hazards.
        </li>
      </ul>

      <h4 className="mt-6 text-xl font-semibold text-gray-900">
        Feature Space Manifold Visualization (t-SNE)
      </h4>
      <p>
        To mathematically prove that the fog was being filtered implicitly within
        the network, we deployed a PyTorch forward hook to extract the raw
        512-dimensional mathematical tensors and visualized them using t-SNE. When
        processing both "Clear Weather" and "Foggy Weather" inputs, our proposed
        network's features mapped to the exact same tight manifold clusters. This
        massive overlap visually and scientifically proves the creation of{" "}
        <strong>Domain-Invariant Embeddings</strong>.
      </p>

      <h3 className="mt-10 text-2xl font-bold text-gray-900">Conclusion</h3>
      <p>
        This paper introduces a novel, highly optimized single-stage implicit
        dehazing architecture specifically engineered for autonomous vehicle
        perception in adverse weather. By replacing explicit, latency-heavy image
        reconstruction modules with a mathematical Dark Channel Prior loss
        optimized directly in the latent feature space, we completely eliminate
        the error propagation inherent in standard two-stage pipelines. Our
        approach yields a massive 58% increase in inference speed, improves
        overall mIoU, and creates domain-invariant embeddings that mathematically
        preserve safety-critical hazards.
      </p>
    </div>
  );
};

export default ImplicitDehazingArticleContent;
