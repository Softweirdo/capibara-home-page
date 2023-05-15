import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
    }, [])
    return (
      <Container>
        <Box>
          <h1>Legal Disclaimer</h1>
        </Box>
        <br />
        <p>
          You should carefully consider the risks involved in purchasing and
          holding digital currencies and also the risks described below, as well
          as the other information included in this FAF token White Paper (the
          “White Paper”) and in website (the “Website”), before you decide to
          use any of the information herein and/or purchasing the Fairface FAF
          tokens (FAF), and/or attempting to use them Fairface platform. For
          further information, please carefully read the Legal Considerations,
          Risks and Disclaimers in the Website which constitutes an integral
          part of the White Paper.
        </p><br />
        <p>
          This White Paper is meant to provide the reader with general
          information regarding the FAF token and its usage on Fairface platform
          (the “Platform”). It is meant to inform the current design and/or
          planned design of the Tokens and its implementation on the Platform.
          This White Paper is informational only and does not represent any
          commitment to you, the reader, of any of the current or future designs
          or functionality of the Tokens or the Platform. Moreover, this White
          Paper is not a solicitation to purchase the Tokens or any other
          instrument.
        </p><br />
        <p>
          Purchasing the Tokens and/or NFTs involves considerable risk. The
          Tokens may become worthless and the Platform may not meet your needs.
          No purchases can be refunded or exchanged. Do not purchase the Tokens
          with money you cannot afford to lose. There is no guarantee that the
          utility of the Tokens will meet your needs or expectations.
        </p><br />
        {/* <br />
        <h2>Consent</h2> */}
        <p>
          If you purchase the Tokens you are inherently assuming the risk of its
          loss of value from the time of the purchase, and you are agreeing that
          the Tokens’ future functionality might be all they are ever capable of
          doing. If you purchase any of the Tokens you agree that you have no
          recourse and you will not assert any claim, action, judgement or
          remedy against Fairface (its offices, owners, employees, agents,
          advisors, affiliates, distributes, group companies, and subsidiaries)
          if the Tokens loses value, the Fairface Platform ceases to function,
          or if the Platform does not ultimately meet expectations.
        </p><br />
        {/* <br />
        <h2>Information we collect</h2> */}
        <p>
          If you are uncertain whether to purchase the Tokens in light of these
          disclaimers or legal notices contained herein, or if you are concerned
          about the loss of any money you use to purchase the Tokens we strongly
          urge you not to purchase any Tokens.
        </p><br />
        <p>
          We recommend you consult legal, financial, tax, technology and other
          professional advisors or experts for further guidance before
          purchasing the Tokens. We cannot provide you any of the foregoing
          advice. Accordingly, you are strongly advised to take independent
          legal advice in respect of the legality in your jurisdiction of your
          purchase of the Tokens.
        </p><br />
        <p>
          The Tokens are not shares or securities of any type. The Tokens exist
          to facilitate your use of the Platform. They are not investments;
          there is no promise or expectation that they will increase in value;
          they are valuable only insofar as they are designed to work within the
          Platform, if at all.
        </p><br />
      
      </Container>
    );
}

export default PrivacyPolicy
