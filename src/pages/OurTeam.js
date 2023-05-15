import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import team1 from "../assets/images/team.jpg";
import team2 from "../assets/images/team 2.jpg";
import team3 from "../assets/images/team3.jpg";
import team4 from "../assets/images/team4.jpg";

const OurTeam = () => {
    // useEffect(() => {
    //     window.scroll({
    //         top: 0,
    //         left: 0,
    //         behavior: 'smooth'
    //       })
    // }, [])
    return (
      <Container>
        <div class="container1 mx-auto mt-5 col-md-10">
          <div class="header1">
            {/* <div class="title1">Leadership Team</div> */}
            <Typography class="header1" variant="h1">
              Leadership
            </Typography>
            <p>
              <small class="text-muted">
                Our philosophy is about building great relationships internally
                as well as with clients. Our team provide solutions which are
                based on innovation, years of research and relevant and in-depth
                domain experience and will therefore put us ahead in the game
                and at the same time enable us to better achieve our business
                objectives.
              </small>
            </p>
          </div>
          <div
            class="row"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <Grid container>
              <Grid item sm={12} md={3}>
                {" "}
                <div class="card1 col-md-3 mt-100 mb-100">
                  <div class="card-content">
                    <div class="card-body1 p-0">
                      <div class="profile1">
                        {" "}
                        <img src={team1} />{" "}
                      </div>
                      <div class="card-title">
                        {" "}
                        Anand Venkataiah
                        <br /> <small>CEO </small>{" "}
                      </div>
                      <div class="card-subtitle">
                        <p>
                          {" "}
                          <small class="text-muted">
                            {" "}
                            <q>
                              Over 20 years of experience with a demonstrated
                              history of working in emerging technologies,
                              services industry, educational and Finance
                              industry. Delivered various projects on blockchain
                              to clients. Experience in building and
                              successfully running Saas (Software as a service)
                              businesses globally.
                            </q>
                          </small>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={3}>
                {" "}
                <div class="card1 col-md-3 mt-100 mb-100">
                  <div class="card-content">
                    <div class="card-body1 p-0">
                      <div class="profile1">
                        {" "}
                        <img src={team2} />{" "}
                      </div>
                      <div class="card-title">
                        {" "}
                        Tim Brolly
                        <br /> <small>COO</small>{" "}
                      </div>
                      <div class="card-subtitle">
                        <p>
                          {" "}
                          <small class="text-muted">
                            {" "}
                            <q>
                              More than 25 years of experience in the field of
                              blockchain projects and emerging technologies,
                              Media, Education industry. Tim worked in the roles
                              of Operations Director, Business development,
                              Sales, Marketing and Public relations.
                            </q>
                          </small>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={3}>
                {" "}
                <div class="card1 col-md-3 mt-100 mb-100">
                  <div class="card-content">
                    <div class="card-body1 p-0">
                      <div class="profile1">
                        {" "}
                        <img src={team3} />{" "}
                      </div>
                      <div class="card-title">
                        {" "}
                        James Mburu
                        <br /> <small>CFO</small>{" "}
                      </div>
                      <div class="card-subtitle">
                        <p>
                          {" "}
                          <small class="text-muted">
                            {" "}
                            <q>
                              Professionally qualified expert in finance and
                              accountancy, auditing and corporate finance.
                              Former CEO of an international organisation
                              affiliated to USAID and Finance Team Leader in
                              Washington DC government. Having over 30 years of
                              experience in banking and finance in the roles of
                              Internal Auditor, Financial Analyst and Chief
                              Financial Officer. James also gives guest lectures
                              in international business, finance, and economics
                              in various UK universities.
                            </q>
                          </small>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={3}>
                {" "}
                <div class="card1 col-md-3 mt-100 mb-100">
                  <div class="card-content">
                    <div class="card-body1 p-0">
                      <div class="profile1">
                        {" "}
                        <img src={team4} />{" "}
                      </div>
                      <div class="card-title">
                        {" "}
                        Perter Reynolds
                        <br /> <small>CMO </small>{" "}
                      </div>
                      <div class="card-subtitle">
                        <p>
                          {" "}
                          <small class="text-muted">
                            {" "}
                            <q>
                              Peter Reynolds has a career in marketing spanning
                              nearly 40 years. He worked as a copywriter and
                              creative director in many leading London
                              advertising agencies. In recent years he has
                              worked as a marketing consultant for organisations
                              such as the Ministry of Defence, the NHS and
                              Hewlett Packard in UK.
                            </q>
                          </small>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          {/* <div class="ft">
        <div class="btn1 btn-outline">Tell a nice word</div>
    </div> */}
        </div>
      </Container>
    );
};

export default OurTeam;
