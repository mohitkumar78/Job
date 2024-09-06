import Company from "../Models/company.model.js"
import { dotenv } from "dotenv"

dotenv.config()

export const RigisterCompany = async (req, res) => {

    try {
        const { CovvmpanyName, description, website, location, logo } = req.body

        if (!CompanyName) {
            return res.status(400).json({
                message: "company name is missing",
                success: false
            })
        }

        let company = Company.findOne({ name: CompanyName })

        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }

        company = await Company.create({
            name: CompanyName,
            description: description,
            website: website,
            location: location,
            logo: logo,
            userId: req.id

        })

        return res.status(200).json(
            {
                company,
                message: "Company Register Sucessfully",
                success: true
            }
        )


    } catch (error) {
        console.log("error occur while rigister the company")
        return res.status(400).json(
            {
                message: "Internal server error",
                success: false
            }
        )
    }

}
